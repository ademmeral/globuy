import React from 'react'

function InfoArea({ product, keywords = true, ...props }) {
  if (!product) return;
  return (
    <footer className="flex-col product-footer" {...props}>
      <div>
        <h5>Brand</h5>
        <span>{product.brand?.name || product.brand}</span>
      </div>
      <div>
        <h5>Category</h5>
        <span>{product.category?.name || product.category}</span>
      </div>
      {
        keywords ? (
          <div>
            <h5>Keywords</h5>
            <span>{product.keywords.join(', ')}</span>
          </div>
        ) : null
      }
    </footer>
  )
}

export default InfoArea