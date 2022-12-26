import React from "react";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../hooks/AuthContext";
import { SingIn } from "../pages/signIn";
import { Auth } from "./AuthRoute";

export function Route() {
  const { user, loading } = useAuth();
  if (loading) {
    return <ActivityIndicator />;
  }

  return user ? <Auth /> : <SingIn />;
}
