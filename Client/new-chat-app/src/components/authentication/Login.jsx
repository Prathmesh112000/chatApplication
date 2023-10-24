import React, { useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  
} from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { useHistory ,Link } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history=useHistory()
const toast = useToast()
  const handleLogin = async() => {
    // Implement your login logic here
    setLoading(true);
    if (!email || !password) { 
      toast({
          title: 'All Fields are Required',
          description: "Please fill all the details",
          status: 'error',
          duration: 9000,
          isClosable: true,
      })
      return
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const { data } = await axios.post("/api/user/login", {email,password}, config)
      console.log("data", data);

     
     
       toast({
          title: 'Login Success.',
          description: "User Login Successfully",
          status: 'success',
          duration: 9000,
          isClosable: true,
       })
      localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false)
    //  navigate("http://localhost:3000/api/user")
      //  navigate("/chat")
      history.push("/chat")
    } catch (error) {
       toast({
          title: 'Error Occured',
          description: "Something went wrong, please try again",
          status: 'error',
          duration: 9000,
          isClosable: true,
       })
      
    }
   
  };

  return (
    <ChakraProvider>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor="gray.100"
      >
        <Box
          borderWidth={1}
          px={4}
          width="full"
          maxWidth="500px"
          borderRadius={4}
          textAlign="center"
          boxShadow="lg"
        >
          <Box p={4}>
            <Heading size="md">Login</Heading>
          </Box>

          <Box p={4}>
            <form>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>

                <Button
                  colorScheme="teal"
                  type="button"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Stack>
            </form>
            <Link to="/register">create an account</Link>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Login;
