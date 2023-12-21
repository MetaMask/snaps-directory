import { assert } from '@metamask/utils';
import type { JSDocTagInfo, Type } from 'ts-morph';
import { Project, SyntaxKind } from 'ts-morph';

/**
 * Get a tag from a JSDoc node.
 *
 * @param node - The JSDoc node.
 * @param kind - The tag kind, e.g., `text`.
 * @returns The tag, or `undefined` if the tag does not exist.
 */
function getTag(node: JSDocTagInfo, kind: string) {
  const tag = node.getText().find((text) => text.kind === kind);
  assert(tag, `The JSDoc node must have a ${kind} tag.`);

  return tag.text;
}

/**
 * Get the description from a JSDoc node.
 *
 * This will remove the `- ` prefix from the description, if it exists.
 *
 * @param node - The JSDoc node.
 * @returns The description.
 */
function getDescription(node: JSDocTagInfo) {
  const tag = getTag(node, 'text');
  if (tag.startsWith('- ')) {
    return tag.slice(2);
  }

  return tag;
}

/**
 * Unwrap a Promise type.
 *
 * @param type - The type to unwrap.
 * @returns The unwrapped type as a string.
 */
export function unwrapPromise(type: Type) {
  if (type.getSymbol()?.getName() === 'Promise') {
    return type.getTypeArguments()?.[0]?.getText();
  }

  return type.getText();
}

/**
 * Parse a Snap declaration file into a format usable by Gatsby.
 *
 * @param path - The path to the declaration file.
 * @returns The methods as an array.
 */
export function parseDeclarationFile(path: string) {
  const project = new Project({ compilerOptions: { strict: true } });
  const file = project.addSourceFileAtPath(path);

  const snap = file.getTypeAlias('SnapInterface');
  if (!snap) {
    return null;
  }

  const type = snap.getTypeNode()?.asKind(SyntaxKind.TypeLiteral);
  const members = type?.getMembers();
  if (!members?.length) {
    return null;
  }

  return members
    .map((member) => member.asKind(SyntaxKind.MethodSignature))
    .filter(Boolean)
    .map((fn) => {
      assert(fn);

      const params = fn.getParameters()?.[0];
      const paramsName = params?.getName();
      assert(paramsName);

      const signature = fn.getSignature();
      const paramsTags = signature
        .getJsDocTags()
        .filter((tag) => tag.getName() === 'param')
        .filter((tag) => {
          const parameterName = getTag(tag, 'parameterName');
          return parameterName.startsWith(paramsName);
        })
        .map((tag) => ({
          name: getTag(tag, 'parameterName'),
          description: getDescription(tag),
        }));

      const paramMembers = params
        ?.getTypeNode()
        ?.asKind(SyntaxKind.TypeLiteral)
        ?.getMembers()
        .map((member) => {
          const propertySignature = member.asKind(SyntaxKind.PropertySignature);
          const name = propertySignature?.getName();
          const propertyType = propertySignature?.getType();
          const isUnionWithUndefined =
            propertyType
              ?.getUnionTypes()
              .some((unionType) => unionType.isUndefined()) ?? false;
          return {
            name,
            // This currently also remove null, we should fix that.
            type: propertyType?.getNonNullableType().getText(),
            optional:
              isUnionWithUndefined ||
              propertySignature?.getQuestionTokenNode() !== undefined,
            description: paramsTags.find(
              (tag) => tag.name === `${paramsName}.${name}`,
            )?.description,
          };
        });

      const returnTag = signature
        .getJsDocTags()
        .find((tag) => tag.getName() === 'returns');

      const description = signature
        .getDocumentationComments()
        .filter((comment) => comment.getKind() === 'text')
        .map((comment) => comment.getText());

      return {
        name: fn.getName(),
        description,
        params: {
          name: paramsName,
          type: fn.getParameters()?.[0]?.getType().getText(),
          descriptions: paramsTags,
          members: paramMembers,
        },
        response: {
          type: unwrapPromise(fn.getReturnType()),
          description: returnTag ? getDescription(returnTag) : undefined,
        },
      };
    });
}
