import Button from "./Button/Button"

export default function TabsSection({active, onChange}){
    return(
        <div className="container">
        <section>
            <Button isActive={active ==='meds'} onClick={() => onChange('meds') }>Список всех медикаментов</Button>
            <Button isActive={active ==='users'} onClick={() => onChange('users') }>Список всех пользователей</Button>
            <Button isActive={active ==='orders'} onClick={() => onChange('orders') }>Список всех заказов</Button>
            <Button isActive={active ==='deliverys'} onClick={() => onChange('deliverys') }>Список всех доставок</Button>
            <Button isActive={active ==='details'} onClick={() => onChange('details') }>Список всех деталей заказов</Button>
            <Button isActive={active ==='employees'} onClick={() => onChange('employees') }>Список всех сотрудников</Button>
        </section>
        </div>
    )
}