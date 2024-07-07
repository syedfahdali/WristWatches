import Pagination from 'react-bootstrap/Pagination'
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {


console.log('pages',pages,page)


  return (



    pages > 1 && (

  
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin ?  keyword ?   `/search/${keyword}/page/${x + 1}`:`/page/${x + 1}`
                : `/admin/listallproducts/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    
    )
  );
};

export default Paginate;