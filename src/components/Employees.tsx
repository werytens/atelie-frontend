import { Button, TextField } from "@mui/material";
import { Api, IEmployee } from "../api/api";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const initialEmployee: IEmployee = {
  employee_name: "",
  employee_position: 0,
  employee_phone: "",
  employee_email: "",
  employee_address: "",
  employee_passport: "",
  employee_birthday: new Date(),
  employee_hire_date: new Date(),
  employee_termination_date: null,
};

export const Employees = () => {
  const [newEmployee, setNewEmployee] = useState<IEmployee>(initialEmployee);
  const [employees, setEmployees] = useState<IEmployee[] | null>(null);

  useEffect(() => {
    const getEmployees = async () => {
      const employeesResponse = await Api.getEmployees();
      const positions = (await Api.getPositions()).data;

      const employeesData: IEmployee[] = employeesResponse.data.map(
        (item: {
          fullname_employee: string;
          id_position: number;
          phone_employee: string;
          email_employee: string;
          address_employee: string;
          passport_employee: string;
          birthday_employee: string;
          hire_date_employee: string;
          termination_date_employee: string;
        }) => {
          const employeeItem: IEmployee = {
            employee_name: item.fullname_employee,
            employee_position: item.id_position,
            employee_phone: item.phone_employee,
            employee_email: item.email_employee,
            employee_address: item.address_employee,
            employee_passport: item.passport_employee,
            employee_birthday: new Date(item.birthday_employee),
            employee_hire_date: new Date(item.hire_date_employee),
            employee_termination_date:
              item.termination_date_employee !== null
                ? new Date(item.termination_date_employee)
                : null,
          };

          const positionTarget = positions.filter(
            (position: any) =>
              employeeItem.employee_position === position.id_position
          );

          employeeItem.employee_position = positionTarget[0].name_position;

          return employeeItem;
        }
      );

      setEmployees(employeesData);
    };

    if (newEmployee === initialEmployee) {
      getEmployees();
    }
  }, [newEmployee]);

  const createEmployee = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await Api.createEmployee(newEmployee);
    setNewEmployee(initialEmployee);
  };

  const handleInputChange = (field: keyof IEmployee, value: any) => {
    setNewEmployee({ ...newEmployee, [field]: value });
  };

  return (
    <section>
      <h1 className="mb-[20px]">Employees</h1>

      <form action="POST" className="flex flex-col max-w-[350px]">
        <div className="my-[5px]">
          <TextField
            id="employee-name"
            label="Employee Fullname"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange("employee_name", event.target.value);
            }}
          />
        </div>
        <div className="my-[5px]">
          <TextField
            id="employee-position"
            label="Employee Position Id"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(
                "employee_position",
                Number(event.target.value)
              );
            }}
          />
        </div>
        <div className="my-[5px]">
          <TextField
            id="employee-phone"
            label="Employee Phone"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange("employee_phone", event.target.value);
            }}
          />
        </div>
        <div className="my-[5px]">
          <TextField
            id="employee-email"
            label="Employee Email"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange("employee_email", event.target.value);
            }}
          />
        </div>
        <div className="my-[5px]">
          <TextField
            id="employee-address"
            label="Employee Address"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange("employee_address", event.target.value);
            }}
          />
        </div>
        <div className="my-[5px]">
          <TextField
            id="employee-passport"
            label="Employee Passport"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange("employee_passport", event.target.value);
            }}
          />
        </div>
        <div className="my-[5px]">
          <TextField
            id="employee-birthday"
            label="Employee Birthday"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(
                "employee_birthday",
                new Date(event.target.value)
              );
            }}
          />
        </div>
        <div className="my-[5px]">
          <TextField
            id="employee-hire-date"
            label="Hire Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(
                "employee_hire_date",
                new Date(event.target.value)
              );
            }}
          />
        </div>
        <div className="my-[5px]">
          <TextField
            id="employee-termination-date"
            label="Termination Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(
                "employee_termination_date",
                new Date(event.target.value)
              );
            }}
          />
        </div>

        <div className="mt-[20px]">
          <Button onClick={createEmployee} variant="outlined">
            Add
          </Button>
        </div>
      </form>

      <table className="mt-[10px]">
        <thead>
          <tr>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              №
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Fullname
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Position
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Phone
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Email
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Address
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Passport
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Birthday
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Hire Date
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Termination Date
            </th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee, index) => (
            <tr key={"employee_" + index}>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {index + 1}
              </td>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {employee.employee_name}
              </td>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {employee.employee_position}
              </td>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {employee.employee_phone}
              </td>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {employee.employee_email}
              </td>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {employee.employee_address}
              </td>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {employee.employee_passport}
              </td>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {format(employee.employee_birthday, "dd.MM.yyyy")}
              </td>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {format(employee.employee_hire_date, "dd.MM.yyyy")}
              </td>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {employee.employee_termination_date !== null
                  ? format(employee.employee_termination_date, "dd.MM.yyyy")
                  : "Don't terminated."}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
