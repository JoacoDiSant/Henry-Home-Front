import React from "react";
import "antd/dist/antd.css";
import { Cascader } from "antd";

export default function Beds({ setInfo, Info }) {
  const options = [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
    {
      value: "4",
      label: "4",
    },
    {
      value: "5",
      label: "5",
    },
    {
      value: "6",
      label: "6",
    },
    {
      value: "7",
      label: "7",
    },
    {
      value: "8",
      label: "8",
    },

  ];

  const bedsChange = (e) => {
    setInfo({ ...Info, numberOfBeds: e[0] });
    console.log(Info)
  }

  return (

    <Cascader
      className="filter"
      options={options}
      onChange={bedsChange}
      placeholder="Número de camas..."
      allowClear={false}
    />

  );
}
