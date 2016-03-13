'use strict'

let _ = require('lodash')

/**
 * Works as find, but calculates pagedCount and totalCount if pageNumber is specified
 *
 * @param model
 * @param query
 * @param options
 * @returns {*}
 */
function find (model, query, options) {
  let skip
  let hasPaging
  let pagesCount
  let projection = query.projection
  let mQuery = projection ? model.find(query, projection) : model.find(query)

  _.defaults(options, { itemsPerPage: 20, pageNumber: 0 })
  hasPaging = options.pageNumber > 0

  if (hasPaging) {
    skip = (options.pageNumber - 1) * options.itemsPerPage
    options.itemsPerPage = parseInt(options.itemsPerPage, 10)

    mQuery = mQuery.skip(skip).limit(options.itemsPerPage)
  }

  if (options.sort) {
    mQuery = mQuery.sort(options.sort)
  }

  return mQuery.toArrayAsync()
    .then((results) => {
      if (!hasPaging) {
        return {
          results: results
        }
      }

      return model.countAsync(query)
        .then((count) => {
          pagesCount = Math.ceil(count / options.itemsPerPage) || 1
          return {
            pagesCount: pagesCount,
            results: results,
            totalCount: count
          }
        })
    })
}

module.exports = find
