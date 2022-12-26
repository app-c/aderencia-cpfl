import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Input } from "../../components/TextInput";
import { useAuth } from "../../hooks/AuthContext";

export function SingIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const submit = React.useCallback(() => {
    signIn({
      email,
      senha,
    });
  }, [email, senha, signIn]);

  return (
    <View className="items-center justify-center p-5 flex-1 bg-gray-800 ">
      <Text className="text-orange-500 font-black text-3xl mb-10 ">
        Cartilha do cordenador
      </Text>

      <View className="w-full">
        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          className=" p-2 h-10 w-full border-green-700 border-2  focus:border-green-300 mb-10 placeholder-cyan-100 "
          placeholder="E-mail"
          placeholderTextColor="#a7a7a7"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          onChangeText={setSenha}
          value={senha}
          className=" p-2 h-10 w-full border-green-700 border-2  focus:border-green-300 mb-10 placeholder-cyan-100 "
          placeholder="Senha"
          placeholderTextColor="#a7a7a7"
          secureTextEntry
        />

        <TouchableOpacity
          onPress={submit}
          className="bg-blue-500 rounded-md h-10 justify-center items-center"
        >
          <Text className="text-cyan-100 font-bold ">ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
