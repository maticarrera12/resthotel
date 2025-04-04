import Pagination from '@mui/material/Pagination';
import "./pagination.css"
const PaginationComponent = ({ roomsPerPage, totalRooms, currentPage, paginate }) => {
    const pageCount = Math.ceil(totalRooms / roomsPerPage); // Calcular total de páginas

    return (
        <div className='pagination'>
            <Pagination 
                count={pageCount} 
                page={currentPage} 
                onChange={paginate} // Llamar a paginate al cambiar de página
                color="primary"
                size="large"
            />
        </div>
    );
};

export default PaginationComponent;
