module.exports = {
  response: (res, status, page, pageCount, result, err) => {
    const resultPrint = {}
    resultPrint.status = 'success'
    resultPrint.status_code = status
    resultPrint.page = page
    resultPrint.products_page_count = pageCount
    resultPrint.result = result
    resultPrint.err = err || null
    return res.status(resultPrint.status_code).json(resultPrint)
  }
}
