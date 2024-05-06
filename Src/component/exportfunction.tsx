import call from 'react-native-phone-call';

export const phonecall = phone => {
  const args = {
    number: phone.toString(), // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };
  call(args).catch(console.error);
};
