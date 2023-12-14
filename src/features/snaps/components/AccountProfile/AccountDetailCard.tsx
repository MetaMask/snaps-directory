import {
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  HStack,
  Image,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEnsName } from 'wagmi';

import DefaultAvator from '../../../../assets/images/avator.png';
import {
  AuditorIcon,
  DeveloperIcon,
  ReviewerIcon,
} from '../../../../components';
import { renderShortAddress } from '../../../../utils/address';

type AccountProps = {
  address: string;
};

const AccountDetailCard = (account: AccountProps) => {
  const { data, isLoading } = useEnsName({
    address: account.address,
  });

  return (
    <Center w={'100%'}>
      {isLoading ? (
        <CircularProgress value={80} />
      ) : (
        <VStack spacing={8} w={'95%'}>
          <Image
            style={{ borderRadius: '50%' }}
            src={DefaultAvator}
            alt={'Fox'}
            objectFit="cover"
          />
          <Flex justify={'end'} w={'inherit'} mt={'-20'}>
            <Button color={'#0376C9'} variant="ghost">
              Edit Profile
            </Button>
          </Flex>
          <Text fontSize={'36px'} fontWeight={'500'} fontStyle={'normal'}>
            {data ?? renderShortAddress(account.address)}
          </Text>

          <Box mt={1}>
            <HStack>
              <Tag
                size={'lg'}
                variant={'solid'}
                bg={'#FFDC5B40'}
                borderRadius={'full'}
              >
                <TagLeftIcon boxSize={'16px'} as={DeveloperIcon} />
                <TagLabel color={'#FFC700'}>Developer</TagLabel>
              </Tag>
              <Tag
                size={'lg'}
                variant={'solid'}
                bg={'#72398E40'}
                borderRadius={'full'}
              >
                <TagLeftIcon boxSize={'16px'} as={AuditorIcon} />
                <TagLabel color={'#AE00FF'}>Auditor</TagLabel>
              </Tag>
              <Tag
                size={'lg'}
                variant={'solid'}
                bg={'#42FF3240'}
                borderRadius={'full'}
              >
                <TagLeftIcon boxSize={'16px'} as={ReviewerIcon} />
                <TagLabel color={'#0FB900'}>Reviewer</TagLabel>
              </Tag>
            </HStack>
          </Box>
        </VStack>
      )}
    </Center>
  );
};

export default AccountDetailCard;
