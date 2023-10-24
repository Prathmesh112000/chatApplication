// RegistrationForm.js
import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useHistory ,Link } from 'react-router-dom'
// import { useNavigate } from "react-router-dom"
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    gender: 'male', // Default to 'male'
    password: '',
    confirmPassword:""
  });
    const history=useHistory()
  const [loading,setLoading]=useState(true);
  const toast = useToast()
  // const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
 
    const { name,email, mobile_number, password,confirmPassword}=formData
    if (!name && !email && !password  && !mobile_number) {
       toast({
          title: 'All Fields are Required',
          description: "Please fill all the details",
          status: 'error',
          duration: 9000,
          isClosable: true,
       })
      return
    }
    
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: "Please check your password",
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
      const { data } = await axios.post("/api/user/register", formData, config)
     
      console.log("data",data)
       toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
       })
      localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false)
          history.push("/chat")
    //  navigate("http://localhost:3000/api/user")
      
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
        maxW="md"
        mx="auto"
        mt={8}
        p={8}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading textAlign="center" mb={6}>
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Mobile Number</FormLabel>
            <Input
              type="tel"
              placeholder="Enter your mobile number"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              defaultValue={formData.gender}
              onChange={(value) => setFormData((prevData) => ({ ...prevData, gender: value }))}
            >
              <Stack direction="row">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
             <FormControl mb={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" mt={4} w="100%">
            Register
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default RegistrationForm;
