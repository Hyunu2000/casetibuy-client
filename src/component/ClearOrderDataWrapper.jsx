import React from "react";
import { useClearOrderData } from "../hooks/useClearOrderData.js";

export default function ClearOrderDataWrapper() {
    useClearOrderData();
    return null;
}