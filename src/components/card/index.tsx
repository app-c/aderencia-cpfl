import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Box, Container, Texts, Touch } from "./styles";

interface Props {
  text: string;
  pres: () => void;
  check: boolean;
  hour: string;
}

const variant = {
  a: "bg-emerald-500",
  b: "bg-gray-700",
};

export function Card({ text, hour, pres, check }: Props) {
  const w = Dimensions.get("window").width;

  return (
    <Container
      className={`mt-2 p-3 rounded-md ${check ? variant.a : variant.b}`}
    >
      <Texts className="text-gray-100 font-bold">{text}</Texts>

      <Box className="flex-row items-center justify-between ">
        <Touch
          className=" w-24 mt-5 p-1 items-center justify-center rounded-md bg-gray-500"
          onPress={pres}
        >
          <Texts
            className={`${check ? "text-green-300" : "text-gray-800"} text-1xl`}
          >
            {check ? "uncheck" : "check"}
          </Texts>
        </Touch>

        <Box className=" w-14 mt-5 p-1 items-center justify-center rounded-md bg-gray-500">
          <Texts
            className={`${check ? "text-green-300" : "text-gray-800"} text-1xl`}
          >
            {hour}
          </Texts>
        </Box>
      </Box>
    </Container>
  );
}
