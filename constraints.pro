%===============================================================================
% Utility predicates
%===============================================================================

% True if RepoName can be unified with the repository name part of RepoUrl, a
% complete URL for a repository on GitHub. This URL must include the ".git"
% extension.
repo_name(RepoUrl, RepoName) :-
  Prefix = 'https://github.com/MetaMask/',
  atom_length(Prefix, PrefixLength),
  Suffix = '.git',
  atom_length(Suffix, SuffixLength),
  atom_length(RepoUrl, RepoUrlLength),
  sub_atom(RepoUrl, 0, PrefixLength, After, Prefix),
  sub_atom(RepoUrl, Before, SuffixLength, 0, Suffix),
  Start is RepoUrlLength - After + 1,
  End is Before + 1,
  RepoNameLength is End - Start,
  sub_atom(RepoUrl, PrefixLength, RepoNameLength, SuffixLength, RepoName).

%===============================================================================
% Constraints
%===============================================================================

% The package must have a name.
\+ gen_enforced_field(WorkspaceCwd, 'name', null).

% The package must have a description.
\+ gen_enforced_field(WorkspaceCwd, 'description', null).

% The homepage of the package must match its name (which is in turn based on its
% workspace directory name).
gen_enforced_field(WorkspaceCwd, 'homepage', CorrectHomepageUrl) :-
  workspace_field(WorkspaceCwd, 'repository.url', RepoUrl),
  repo_name(RepoUrl, RepoName),
  atomic_list_concat(['https://github.com/MetaMask/', RepoName, '#readme'], CorrectHomepageUrl).

% The bugs URL of the package must point to the Issues page for the repository.
gen_enforced_field(WorkspaceCwd, 'bugs.url', CorrectBugsUrl) :-
  \+ workspace_field(WorkspaceCwd, 'private', true),
  workspace_field(WorkspaceCwd, 'repository.url', RepoUrl),
  repo_name(RepoUrl, RepoName),
  atomic_list_concat(['https://github.com/MetaMask/', RepoName, '/issues'], CorrectBugsUrl).

% The package must specify Git as the repository type.
gen_enforced_field(WorkspaceCwd, 'repository.type', 'git').

% The package must match the URL of a repo within the MetaMask organization.
gen_enforced_field(WorkspaceCwd, 'repository.url', 'https://github.com/MetaMask/<insert repo name here>.git') :-
  workspace_field(WorkspaceCwd, 'repository.url', RepoUrl),
  \+ repo_name(RepoUrl, _).

% The license for the package must be specified.
gen_enforced_field(WorkspaceCwd, 'license').

% If a dependency is listed under "dependencies", it should not be listed under
% "devDependencies".
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, null, DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, 'dependencies'),
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  DependencyType == 'devDependencies'.

% The package must specify a minimum Node version of 16.
gen_enforced_field(WorkspaceCwd, 'engines.node', '>=16.0.0').