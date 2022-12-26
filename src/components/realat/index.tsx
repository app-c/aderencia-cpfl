import React from "react";
import { Box, Container, Texts } from "./styles";

interface Props {
  item: string;
  descricao: string;
  situacao: string;
}

export function Relat({ item, descricao, situacao }: Props) {
  return (
    <Container className="bg-slate-300 mb-2 rounded-sm p-1 ">
      <Box className="flex-row items-center justify-between ">
        <Box className=" mr-2 items-center justify-center">
          <Texts>{item}</Texts>
        </Box>

        <Box className=" w-4/5 self-start ">
          <Texts>{descricao}</Texts>
        </Box>

        <Box>
          <Texts>{situacao}</Texts>
        </Box>
      </Box>

      <Box className="h-0.5 bg-black mt-3" />
    </Container>
  );
}
