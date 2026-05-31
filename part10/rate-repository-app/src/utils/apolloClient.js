import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';

const createApolloClient = (authStorage) => {
    const uri = Constants.expoConfig?.extra?.apolloUri;
    const httpLink = new HttpLink({ uri });
    const authLink = setContext(async (_, { headers }) => {
        try {
        const accessToken = await authStorage.getAccessToken();
        return {
            headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '',
            },
        };
        } catch (e) {
        console.log(e);
        return {
            headers,
        };
        }
    });
    if (!uri) {
        throw new Error('Apollouri missing');
    }

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;