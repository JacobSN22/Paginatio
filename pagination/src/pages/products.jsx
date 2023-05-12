import axios from "axios";
import { useEffect, useState } from "react";
import "../components/style/products.scss"

const url = "https://api.mediehuset.net/bakeonline/products";

const productAmount = 5;

export const Products = () => {
    const [productList, setProductList] = useState([]);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    const paginate = (n) => {
        setCurrentPage(n)
    }

    const indexOfLastPost = currentPage * productAmount;
    const indexOfFirstPage = indexOfLastPost - productAmount;
    const currentPosts = productList.slice(indexOfFirstPage, indexOfLastPost)

    useEffect(() => {
        axios.get(url).then((data) => {
            setProductList(data.data.items)
            const newPageNumbers = [];
            for(
                let i = 1;
                i <= Math.round(data.data.items.length / productAmount);
                i++
            ) {
                newPageNumbers.push(i);
            }
            setPageNumbers(newPageNumbers)
        });
    }, []);

    return(
            <div>
                {pageNumbers.map((number) => {
                    return (
                    <header onClick={() => paginate(number)} key={number}>
                        <h1>{number}</h1>
                    </header>)
                })}

                {currentPosts.map((product) => {
                    return <div key={product.id}><p>{product.title} {product.price} kr.</p></div>;
                })}
            </div>
    )
}
