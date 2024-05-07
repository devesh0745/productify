import React, { useEffect,useState } from "react";
import { getInitialStateAsync, productSelector } from "../../redux/reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import "./ProductList.css"

function ProductList(props) {
    const products = useSelector(productSelector);
    console.log("**********",products)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getInitialStateAsync());
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate pagination data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    // Filter products based on the search query and then apply pagination
    const filteredProducts = products.filter(product =>
        product.productName && product.productName.toLowerCase().includes(props.searchQuery.toLowerCase())
    );
    const paginatedProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    // Function to format date and time
    function formatDate(dateTimeString) {
        const date = new Date(dateTimeString);
        // Format the date as required, for example:
        const formattedDate = date.toLocaleDateString(); // Format: MM/DD/YYYY
        const formattedTime = date.toLocaleTimeString(); // Format: HH:MM:SS
        return `${formattedDate} ${formattedTime}`;
    }

    return (
        <>
    <div id="product-list-div">
    <table id="product-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {paginatedProducts.map((product, index) => (
        <tr key={index}>
          <td>{product.productName}</td>
          <td>{product.productPrice}</td>
          <td>{formatDate(product.createdAt)}</td>
          <td>
            <button onClick={() => props.updateProduct(product)}>Update</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {/* Pagination controls */}
  <div id="pgn">
    <button id="prev-pg" onClick={() => setCurrentPage(prevPage => prevPage - 1)} disabled={currentPage === 1}>
      Previous
    </button>
    <button id="next-pg" onClick={() => setCurrentPage(prevPage => prevPage + 1)} disabled={indexOfLastItem >= filteredProducts.length}>
      Next
    </button>
  </div>
</div>

        </>
    );
};

export default ProductList;
