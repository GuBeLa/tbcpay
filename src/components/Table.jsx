import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

const Table = () => {
  const empList = [
    ["ვაჟა", "გაბისიანი", "210010526", "კაცი", "07/05/1965", "თბილისი", "კაკაბაძის 7"],
    ["ვაჟა", "გაბისიანი", "210010526", "კაცი", "07/05/1965", "თბილისი", "კაკაბაძის 7"],
    ["ვაჟა", "გაბისიანი", "210010526", "კაცი", "07/05/1965", "თბილისი", "კაკაბაძის 7"],
    ["ნინო", "სამაკაშვილი", "210010528", "ქალი", "07/05/1965", "თბილისი", "კაკაბაძის 7"],
  ];

  const [data, setData] = useState(empList);

  const columns = [
    {
      name: "name",
      label: "სახელი",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "lastname",
      label: "გვარი",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "personal",
      label: "პირადი ნომერი",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "gender",
      label: "სქესი",
      options: {
        filter: true,
        sort: true,
        filterList: [],
        customFilterListOptions: { render: v => `სქესი: ${v}` },
        filterOptions: {
          names: ['ქალი', 'კაცი']
        },
      }
    },
    {
      name: "birth",
      label: "დაბადების თარიღი",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "birthplace",
      label: "დაბადების ადგილი",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "address",
      label: "მისამართი",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "Action",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: () => {
          return (
            <Fab size="small" color="secondary" aria-label="edit">
              <EditIcon />
            </Fab>
          );
        }
      }
    },
  ];

  const options = {
    filter: true,
    print: false,
    draggableColumns: {
      enabled: true,
      transitionTime: 300,
    },
    onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
      const index = oldRow.tableData.id;
      const updatedRows = [...data]
      updatedRows[index] = updatedRow
      setTimeout(() => {
        setData(updatedRows)
        resolve()
      }, 2000)
    }),
    onFilterChange: (changedColumn, filterList) => {
      console.log(changedColumn, filterList);
    },
    selectableRows: 'multiple',
    filterType: 'dropdown',
    responsive: 'vertical',
    rowsPerPage: 10,
    
  };

  return (
    <MUIDataTable
      title={"Employee List"}
      data={data}
      columns={columns}
      options={options}
      editable={{
        onRowAdd: (newRow) => new Promise((resolve, reject) => {
          const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
          setTimeout(() => {
            setData(updatedRows)
            resolve()
          }, 2000)
        }),
        onRowDelete: selectedRow => new Promise((resolve, reject) => {
          const index = selectedRow.tableData.id;
          const updatedRows = [...data]
          updatedRows.splice(index, 1)
          setTimeout(() => {
            setData(updatedRows)
            resolve()
          }, 2000)
        }),
      }}
    />
  )
}

export default Table;