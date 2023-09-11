import React from 'react'
import { Flex, Box, Text, Spacer, Button, Center } from '@chakra-ui/react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
// utils
import getNumberIntervals from "../utils/getNumberIntervals"
// components
import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";

const INITIAL_GROUP_VALUE = {
    ageGroup: [null, null],
    price: null
}
const INTERVAL = {
    MIN: 1,
    MAX: 20
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
    const { control, handleSubmit, watch } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "group"
    }) 
    const ageGroupValue = watch('group').map(({ ageGroup: [start, end] }) => [+start, +end]);
    const { overlap, notInclude } = getNumberIntervals(ageGroupValue, INTERVAL.MIN, INTERVAL.MAX);
    const incompleteIntervals = notInclude.length !== 0;

    return (
        <FormProvider {...methods}>
            <Box p="4" border="4px" borderStyle="dashed" borderColor="gray.300">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                        fields.map((field, index) => (
                            <Box key={field.id}>
                                <FormHeader formName={`價格設定 - ${index + 1}`} handleRemoveForm={() => remove(index)}/>
                                <Flex>
                                    <Box w='full' mr="2">
                                        <AgeGroupSelect name={`group.${index}.ageGroup`} overlapIntervals={overlap} />
                                    </Box>
                                    <Spacer />
                                    <Box w='full'>
                                        <PriceInput name={`group.${index}.price`}/>
                                    </Box>
                                </Flex>
                            </Box>
                        ))
                    }
                    {
                        incompleteIntervals && (
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
                        )
                    }
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