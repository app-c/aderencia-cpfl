/* eslint-disable react/jsx-props-no-spreading */
import { StyledComponent, styled } from "nativewind";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface Props {
  title: string;
  subTitle: string;
  props: TextInputProps;
}

function TInput({ title, subTitle, props, ...rest }: Props) {
  return (
    <View {...rest}>
      <Text className="mb-2">{title}</Text>
      <View className=" p-2 bg-white w-full h-10 border-2 border-green-400 ">
        <TextInput {...props} placeholder={subTitle} className="flex-1" />
      </View>
    </View>
  );
}

const Input = styled(TInput);
export { Input };
