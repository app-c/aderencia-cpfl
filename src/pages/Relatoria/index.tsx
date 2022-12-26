import Async from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Print from "expo-print";
import React, { useCallback } from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import { Header } from "../../components/header";
import { Relat } from "../../components/realat";
import { useAuth } from "../../hooks/AuthContext";
import { Box, Texts, Touch } from "./styles";

interface PropsAderenceia {
  descricao: string;
  nota: string;
  id: string;
  check: string;
}

export function Relatorio() {
  const { user } = useAuth();
  const w = Dimensions.get("window").width;
  const [data, setData] = React.useState<PropsAderenceia[]>([]);
  const [load, setLoad] = React.useState(true);

  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const loadData = React.useCallback(async () => {
    setLoad(true);
    await Async.getItem("relat")
      .then((h) => {
        const response = h ? JSON.parse(h) : [];

        setData(response);
      })
      .catch((h) => console.log(h))
      .finally(() => {
        setTimeout(() => {
          setLoad(false);
        }, 1000);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const ponts = React.useMemo(() => {
    const fil = data.filter((h) => h.check === "feito");

    const pt = fil.reduce((ac, i) => {
      return ac + Number(i.nota);
    }, 0);
    return pt;
  }, [data]);

  //! ! PDF
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div 
        style="display: flex; flex: 1; flex-direction: column;"
      >
        <h1
          style="align-self: center;"
        >title</h1>
    
        <div  
          style="display: flex; flex-direction: column; width: 100vw; background-color: #c4c4c4;"
        >
          <table 
            style="background-color: #d0d0d0; padding: 20px;" border="1"
          >
            <tr
              style="background-color: #ae3c3c; height: 30px;"
            >
              <th>Item</th>
              <th>Descricão</th>
              <th>pontos</th>
            </tr>

            ${data.map(
              (h) =>
                `
                <tr>
                  <td>${h.id}</td>
        
                  <td>${h.descricao}</td>
                  <td>${h.nota}</td>
                </tr>
              `
            )}
    
    
          </table>
        </div>
      </div>
    </body>
    </html>
  `;

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  if (load) {
    return (
      <Box className="flex-1 items-center justify-center bg-slate-900">
        <Box>
          <ActivityIndicator size={50} color="#4d9234" />
        </Box>
      </Box>
    );
  }

  return (
    <Box className="flex-1">
      <Header type="2" name="GERAR RELATÓRIO" />
      <Box className="p-5">
        <Box className="flex-row items-center justify-between">
          <Texts>item</Texts>
          <Texts>descricao</Texts>
          <Texts>situcao</Texts>
        </Box>

        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          style={{ height: w * 1.35 }}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(h) => h.id}
          renderItem={({ item: h }) => (
            <Box>
              <Relat item={h.id} descricao={h.descricao} situacao={h.check} />
            </Box>
          )}
        />
      </Box>

      <Box className="mt-5 bg-slate-400 item p-5">
        <Texts>Total de pontos: {ponts}</Texts>
        <Touch
          className="mt-5 bg-blue-400 p-3 rounded-lg items-center justify-center"
          onPress={print}
        >
          <Texts>Gerar</Texts>
        </Touch>
      </Box>
    </Box>
  );
}
