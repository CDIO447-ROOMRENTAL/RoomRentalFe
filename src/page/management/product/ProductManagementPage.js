import React, { useState } from 'react'
import "./ProductManagementPage.css"
import Pagination from '../../../component/pagination/Pagination'
import Dialog from '../../../component/dialog/Dialog';
import { Outlet } from 'react-router-dom';
function ProductManagementPage() {

  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default ProductManagementPage
