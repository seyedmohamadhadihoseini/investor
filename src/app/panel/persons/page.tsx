import DataListComponent from "@/components/DataTable";

export default  function PersonApp()
{

    return (
        <DataListComponent 
        headers={[
            {value:"firstName",title:"نام"},
            {value:"lastName",title:"نام خانوادگی"},
            {value:"nationalId",title:"کد ملی"},
            {value:"phoneNumber",title:"شماره تماس"},
            {value:"bankAccount",title:"شماره حساب"},
        ]} 
        data={[]}/>
    );
}