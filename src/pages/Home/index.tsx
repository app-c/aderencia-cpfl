/* eslint-disable @typescript-eslint/no-use-before-define */
import Async from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import React, { useCallback, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { Card } from "../../components/card";
import { Header } from "../../components/header";
import { useAuth } from "../../hooks/AuthContext";
import { aderencias } from "../../utils/aderencia";
import { Box, Buton, Container, Flat } from "./styles";

interface PropsAderenceia {
  descricao: string;
  nota: string;
  id: string;
  time: string;
  check: string;
}

export function Home() {
  const { user } = useAuth();
  const w = Dimensions.get("window").width;

  const [data, setData] = React.useState<PropsAderenceia[]>([]);
  const [check, setCheck] = React.useState<PropsAderenceia>([]);
  const [select, setSelect] = useState<PropsAderenceia[]>([]);

  // !! NOTIFICATION

  const PushAlertas = React.useCallback(async () => {
    const dta = new Date().getTime();

    aderencias.forEach(async (item) => {
      const [h, m] = item.time.split(":").map(Number);
      const hors = new Date().setHours(h);
      const hr = new Date(hors).setMinutes(m);

      const dtb = new Date(hr).getTime();

      const seconds = Math.abs(Math.ceil((dta - dtb) / 1000));

      await Notifications.scheduleNotificationAsync({
        content: {
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          title: "Tarefas diárias 👷‍♂️",
          body: item.descricao,
          data: { data: item },
        },

        trigger: { seconds, repeats: false },
      });
    });
    await Async.removeItem("ad");
    setSelect([]);
  }, []);

  const loadDados = React.useCallback(async () => {
    const ad = aderencias.map((h, i) => {
      return {
        ...h,
        id: String(i),
        check: "não fez",
      };
    });

    const rs = await Async.getItem("ad");

    const response = rs ? JSON.parse(rs) : ad;
    setData(ad);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDados();
    }, [loadDados])
  );

  const toggle = useCallback(
    async (item: PropsAderenceia) => {
      const index = select.findIndex((i) => i.id === item.id);
      const arrSelect = [...select];

      if (index !== -1) {
        arrSelect.splice(index, 1);
      } else {
        arrSelect.push(item);
      }

      const rs = arrSelect.map((h) => {
        return {
          ...h,
          check: "feito",
        };
      });

      const dt = [];

      data.forEach((i) => {
        let item = i;

        rs.forEach((h) => {
          if (i.id === h.id) {
            item = h;
          }
        });

        dt.push(item);
      });

      setSelect(arrSelect);
      setCheck(dt);
    },
    [data, select]
  );

  const handleCheck = React.useCallback(async () => {
    await Async.setItem("relat", JSON.stringify(check));
  }, [check]);

  React.useEffect(() => {
    handleCheck();
  }, [handleCheck, select]);

  return (
    <Container className="bg-gray-800 flex-1 ">
      <Header type="1" name={user.nome} />
      <Box>
        <Buton
          className="w-4/6"
          onPress={PushAlertas}
          title="INICIAR TAREFAS"
        />
        <Box className="p-2">
          <FlatList
            contentContainerStyle={{ paddingBottom: 400 }}
            data={data}
            keyExtractor={(h) => String(h.id)}
            renderItem={({ item: h }) => (
              <Box>
                <Card
                  hour={h.time}
                  pres={() => toggle(h)}
                  check={select.findIndex((i) => i.id === h.id) !== -1}
                  text={h.descricao}
                />
              </Box>
            )}
          />
        </Box>
      </Box>
    </Container>
  );
}
