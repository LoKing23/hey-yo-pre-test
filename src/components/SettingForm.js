import React from 'react'
import { Flex, Box, Text, Spacer, Button, Center } from '@chakra-ui/react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
// components
import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";

const INITIAL_GROUP_VALUE = {
    ageGroup: [null, null],
    price: 0
}

const FormHeader = ({ handleRemoveForm, formName }) => {
    return (
        <Flex alignItems='center'>
            <Text fontSize='2xl' fontWeight='bold'>{formName}</Text>
            <Spacer />
            <Button 
                variant='unstyled' 
                onClick={handleRemoveForm}
                color="red.500"
                _hover={{
                    color: 'red.400',
                }}
            >
                X 移除
            </Button>
        </Flex>
    )
}

const SettingForm = ({
    onSubmit = (value) => { console.log(value) }
}) => {
    const methods = useForm({
        defaultValues: { group: [INITIAL_GROUP_VALUE] }
    })        
    const { control, handleSubmit } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "group"
    }) 

    return (
        <FormProvider {...methods}>
            <Box p="4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                        fields.map((field, index) => (
                            <Box key={field.id}>
                                <FormHeader formName={`價格設定 - ${index + 1}`} handleRemoveForm={() => remove(index)}/>
                                <Flex>
                                    <Box w='full' mr="2">
                                        <AgeGroupSelect name={`group.${index}.ageGroup`} />
                                    </Box>
                                    <Spacer />
                                    <Box w='full'>
                                        <PriceInput name={`group.${index}.price`}/>
                                    </Box>
                                </Flex>
                            </Box>
                        ))
                    }
                    <Button 
                        w="fit-content"
                        variant='unstyled' 
                        color='green.500'
                        _hover={{
                            color: 'green.300',
                        }}
                        onClick={() => append(INITIAL_GROUP_VALUE)}
                    >
                        + 新增年齡區間
                    </Button>
                    <Center>
                        <Button
                            mt="4"
                            colorScheme="teal"
                            type="submit"
                        >
                            送出
                        </Button>
                    </Center>
                </form>
            </Box>
        </FormProvider>
    )
}

export default SettingForm