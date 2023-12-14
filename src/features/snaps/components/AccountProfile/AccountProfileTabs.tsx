import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

const AccountProfileTabs = () => {
  return (
    <Tabs align="center" size="lg" variant="unstyled" colorScheme="facebook">
      <TabList>
        <Tab
          ml={'24px'}
          mr={'24px'}
          fontSize={16}
          fontWeight={500}
          color={'#24272A'}
        >
          Developed Snaps
        </Tab>
        <Tab
          ml={'24px'}
          mr={'24px'}
          fontSize={16}
          fontWeight={500}
          color={'#24272A'}
        >
          Security Reports
        </Tab>
        <Tab
          ml={'24px'}
          mr={'24px'}
          fontSize={16}
          fontWeight={500}
          color={'#24272A'}
        >
          Reviews
        </Tab>
        <Tab
          ml={'24px'}
          mr={'24px'}
          fontSize={16}
          fontWeight={500}
          color={'#24272A'}
        >
          Trusted Circle
        </Tab>
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />

      <TabPanels>
        <TabPanel>
          <p>Developed Snaps Panel</p>
        </TabPanel>
        <TabPanel>
          <p>Security Reports Panel!</p>
        </TabPanel>
        <TabPanel>
          <p>Reviews Panel!</p>
        </TabPanel>
        <TabPanel>
          <p>Trusted Circle Panel!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AccountProfileTabs;
