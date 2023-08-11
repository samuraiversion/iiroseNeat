import { decode } from 'html-entities'

export const mailboxMessage = (message) => {
  if (/^@/.test(message)) {
    let parser = false

    message.slice(2).split('<').forEach(e => {
      const tmp = e.split('>')
      if (tmp.length === 3) {
        parser = true
        // roomNotice

        return {
          notice: decode(tmp[0]),
          background: tmp[1],
          timestamp: Number(tmp[2]),
        }
      }
      if (tmp.length === 7) {
        if (/^'\^/.test(tmp[3])) {
          parser = true
          const data = {
            username: decode(tmp[0]),
            avatar: tmp[1],
            gender: tmp[2],
            background: tmp[4],
            timestamp: Number(tmp[5]),
            color: tmp[6],
          }
          // follower
          return data
        } else if (/^'\*/.test(tmp[3])) {
          parser = true
          const data = {
            username: decode(tmp[0]),
            avatar: tmp[1],
            gender: tmp[2],
            background: tmp[4],
            timestamp: Number(tmp[5]),
            color: tmp[6],
            message: decode(tmp[3].substr(3)),
          }
          // like
          return data
        } else if (/^'\$/.test(tmp[3])) {
          parser = true
          const data = {
            username: decode(tmp[0]),
            avatar: tmp[1],
            gender: tmp[2],
            money: parseInt(tmp[3].split(' ')[0].substr(2)),
            message: decode(tmp[3].split(' ')[1] || ''),
            background: tmp[4],
            timestamp: Number(tmp[5]),
            color: tmp[6],
          }
          // payment
          return data
        }
      }
    })

    return parser
  }
}
