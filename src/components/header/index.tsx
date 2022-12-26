import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../hooks/AuthContext";
import { Box, Container, Texts, Touch } from "./styles";

interface Props {
  name: string;
  type: "1" | "2";
}

export function Header({ name, type = "1" }: Props) {
  const { signOut } = useAuth();
  const { goBack } = useNavigation();
  const w = Dimensions.get("window").width;
  return (
    <Container className="bg-gray-800 py-2 px-10 flex-row items-center justify-between">
      <Texts className="text-2xl text-gray-300 ">{name}</Texts>

      {type === "1" ? (
        <Touch onPress={() => signOut()}>
          <Box className="px-5 py-2 bg-red-600 rounded-md">
            <Texts className="text-gray-300">sair</Texts>
          </Box>
        </Touch>
      ) : (
        <Touch onPress={() => goBack()}>
          <Box className="px-5 py-2 bg-blue-600 rounded-md">
            <Texts className="text-gray-300">voltar</Texts>
          </Box>
        </Touch>
      )}
    </Container>
  );
}
