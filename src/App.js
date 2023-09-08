import { useState } from "react";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';
// components
import PriceSettingForm from "./components/PriceSettingForm"
import { set } from "react-hook-form";
/*
使用前四題的 Function 和 Component,實作 AgeGroupPriceList UI
○ UI 如下圖所示,間距色碼字型大小自訂
○ 會輸入 Props onChange 取得的 result 資料,result 格式範例如下
  ■ result = [
  { ageGroup: [7, 16], price: 999.99 },
  { ageGroup: [0, 0], price: 0 },
  ...]
  ■ <AgeGroupPriceList onChange={result => console.log(result)} />
○ 需顯示錯誤提示,以下為驗證條件規範
  ■ 不同組年齡的 AgeGroupSelect 重疊是否有正確顯示錯誤提示
    ● 顯示 年齡區間不可重疊
  ■ 空白的 PriceInput 是否有正確顯示錯誤提示
    ● 顯示 不可以為空白

○ 部分驗證條件規範
  ■ 當所有年齡範圍已經包含 0 到 20 歲時,新增價格設定需要 disabled
  ■ 入住費用是否有正確顯示千分位 (包含小數點的輸入與顯示)
*/

const generateId = () => uuidv4();

function App() {
  const [formIds, setFormIds] = useState([generateId()]);
  const handleRemoveForm = (id) => setFormIds(formIds.filter(formId => formId !== id));
  const handleAddForm = () => setFormIds([...formIds, generateId()]);

  return (
    <Stack px="4">
      {
        formIds.map((id, index) => (
          <PriceSettingForm 
            key={id}
            formName={`價格設定 - ${index + 1}`}
            setRange={(range) => console.log(range)}
            handleSubmit={(data) => console.log(data)}
            handleRemoveForm={() => handleRemoveForm(id)}
          />
        ))
      }
      <Button 
        w="fit-content"
        variant='unstyled' 
        color='green.500'
        _hover={{
          color: 'green.300',
        }}
        onClick={handleAddForm}
      >
         + 新增年齡區間
      </Button>
    </Stack>
  );
}

export default App;
