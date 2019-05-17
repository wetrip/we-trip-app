// @flow

import React from 'react';
import { ScrollView } from 'react-native';

import SettingItemList from './components/SettingItemList';

const ITEMS = [
  {
    title: 'What’s new',
    description:
      'Discover all the news related with tourism and enterteinment in Portugal',
    nextScreen: '',
  },
  {
    title: 'Privacy Settings',
    description:
      'Set the options that fits better with your own privacy preferences',
    nextScreen: '',
  },
  {
    title: 'Terms of Service',
    description:
      'Learn more about our terms in order to you have a better experience',
    nextScreen: '',
  },
  {
    title: 'Support',
    description:
      'Don’t think twice if you’re having a problem with our product, send us a message and we’ll help you',
    nextScreen: '',
  },
  {
    title: 'Rate the App',
    description: 'Are you enjoying your experience here? Let us know!',
    nextScreen: '',
  },
  {
    title: 'About',
    description:
      'Learn more about the team and the tools that was used to build this app',
    nextScreen: '',
  },
];

const onSelectSettingOption = (
  navigation: Object,
  nextScreen: string,
): void => {
  navigation.navigate(nextScreen);
};

type Props = {
  navigation: Object,
};

const Settings = ({ navigation }: Props): Object => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    alwaysBounceVertical={false}
  >
    {ITEMS.map(item => (
      <SettingItemList
        onPress={() => onSelectSettingOption(navigation, item.nextScreen)}
        description={item.description}
        title={item.title}
        key={item.title}
      />
    ))}
  </ScrollView>
);

export default Settings;
