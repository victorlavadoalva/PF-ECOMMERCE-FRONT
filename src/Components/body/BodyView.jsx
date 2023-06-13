import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Paginated } from "../../Components";
import Filters from "../../Components/Filters/Filters";
import Cards from "../../Pages/Store/Components/Cards";
import styles from "./styles.module.css";
// import { useSelector } from "react-redux";



export const BodyView = () => {
    const productsFiltered = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(6);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirsProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productsFiltered.slice(
      indexOfFirsProduct,
      indexOfLastProduct
      );
      console.log(currentProducts, "Currenty productssssss");
  
    const paginated = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  return (
    
    <div className={styles.containerStoreContent}>
      <div className={styles.productsContainer}>
        <div className={styles.paginated}>
              <Paginated
                productsPerPage={productsPerPage}
                allProducts={productsFiltered.length}
                paginated={paginated}
              />
        </div>
        <div className={styles.containerCards}>
          {currentProducts && currentProducts.length > 0 && (
            <Cards products={currentProducts} />
          )}
        </div>
      </div>

      <Filters />
    </div>
  );
};
