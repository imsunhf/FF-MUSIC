// import service from '@/plugin/axios'

import request from '@/plugin/axios'


export function down(id) {
  return request({
    url: '/down',
    method: 'get',
    params: {
      id
    }
  })
}
