<h3>บอกขั้นตอนการติดตั้งหลังจาก clone git hub</h3>

```bash
#install package

#ติดตั้ง package ไปที่ node_modules
yarn 
#หรือ
npm i

#สร้างโฟลเดอร์ .next เพื่อเก็บไฟล์แคช HTML, CSS และ JavaScript
yarn build

#รันไฟล์แคช
yarn start 
```
 
<h3>libraries หรือ package ที่ได้ติดตั้งเพิ่มเติม</h3>

```bash
@headlessui/react #เป็น UI components ใช้งานง่ายเหมาะกับ ออกแบบมาเพื่อใช้กับ Tailwind CSS
@heroicons/react #เป็นชุด Icon SVG สามารถปรับแต่งผ่าน className ได้ง่าย
@tanstack/react-query #สำหรับจัดการ แคช และซิงค์ข้อมูลสามารถ get api ไปเก็บแคชได้ง่ายและสามาถนำสถานะ loading , error ไปใช้ทำ ui ต่อได้
axios #สื่อสารกับ API โดยใช้ HTTP requests
date-fns #สำหรับจัดการวันที่และเวลา
Zustand #ใช้จัดการ goble state ใช้งานง่ายกว่า Redux เล็กกว่า เร็วกว่า และสามารถลองรับ React hooks ได้ด้วย 
#ใช้ในการจัดการ form ช่วยให้การสร้างฟอร์มง่ายขึ้น รวดเร็วขึ้น และมีประสิทธิภาพมากขึ้นเช็ค Validate ง่ายใช้กับ UI Framwork อย่าง MUI และ Component อื่นๆได้ด้วย
```

# Unit Test
```bash
$ yarn cypress:open #ควรรัน next.js ก่อนค่อยรันตัวนี้แยกกัน
```