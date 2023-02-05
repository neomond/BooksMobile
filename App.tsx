import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import MyBooksProvider from "./context/MyBooksProvider";

const API_KEY =
  "apollobeach::stepzen.net+1000::0d1bfb4dc714f02ffe39127321bc5de1f3e538006cff95aefcbbce48d0c95b4a";

const client = new ApolloClient({
  uri: "https://apollobeach.stepzen.net/api/ungaged-porcupine/__graphql",
  headers: {
    Authorization: `Apikey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <MyBooksProvider>
            <Navigation colorScheme={colorScheme} />
          </MyBooksProvider>
          <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
