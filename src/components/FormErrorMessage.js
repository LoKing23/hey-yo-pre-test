import React from 'react'
import { FormErrorMessage as ChakraFormErrorMessage, Text } from '@chakra-ui/react'

const FormErrorMessage = ({ errorMessage }) => (
    <ChakraFormErrorMessage 
        bgColor='red.100'
        p="2"
        rounded={3}
    >
        <Text>
            { errorMessage }
        </Text>
    </ChakraFormErrorMessage>
)

export default FormErrorMessage