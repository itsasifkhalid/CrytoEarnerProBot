import argon2 from 'argon2'
import Admin from '../../models/admin'
import Investor, { investmentStatus, investorStatus } from '../../models/investor'

export const stats = {
  async getAll(): Promise<string> {
    let data = JSON.parse(await investors.getInvestors())
    let balance = 0
    let amount = data.length
    data.forEach((investor) => {
      balance += investor.balance
    })
    data = await Investor.find({ date: { $gt: (new Date()).getTime() - 8.64e7 } })
    let amountToday = data.length
    return JSON.stringify({
      balance,
      amount,
      amountToday
    })
  },
  async getBalance(): Promise<string> {
    const data = JSON.parse(await investors.getInvestors())
    let balance = 0
    data.forEach((investor) => {
      balance += investor.balance
    })
    return JSON.stringify({ balance })
  },
  async getInvestorsAmount(): Promise<string> {
    const data = JSON.parse(await investors.getInvestors())
    return JSON.stringify({ amount: data.length })
  },
  async getInvestorsAmountToday(): Promise<string> {
    const data = await Investor.find({ date: { $gt: (new Date()).getTime() - 8.64e7 } })
    return JSON.stringify({ amount: data.length })
  }
}

export const investors = {
  async getInvestors(): Promise<string> {
    const data = await Investor.find({})
    const investors = []
    data.forEach((investor) => {
      const obj = {
        username: investor.username,
        fullName: investor.fullName,
        status: investorStatus[investor.status],
        balance: investor.balance,
        investments: investor.investments
      }
      obj.investments.forEach((item) => {
        item.status = investmentStatus[item.status]
      })
      investors.push(obj)
    })
    
    return JSON.stringify(investors)
  },
  async getInvestor(username: string): Promise<string> {
    const data = await Investor.findOne({ username })
    const investor = !data ? {} : {
      username: data.username,
      fullName: data.fullName,
      status: investorStatus[data.status],
      balance: data.balance,
      investments: data.investments
    }
    if (investor.investments) {
      investor.investments.forEach((item) => {
        item.status = investmentStatus[item.status]
      })
    }
    
    return JSON.stringify(investor)
  },
  async setInvestorStatus(username: string, status: string): Promise<void> {
    if (!username || !status) { throw new Error() }
    if (!(status in investorStatus)) { throw new Error() }
    if (investorStatus[status] !== investorStatus.BLOCKED) {
      await Investor.updateOne({ username }, { $set: { status: investorStatus[status] } })
      return
    }
    const data = await Investor.findOne({ username })
    if (!data) { return }
    data.status = investorStatus.BLOCKED
    if (data.investments) {
      data.investments.forEach((item) => {
        item.status = investmentStatus.CANCELED
      })
    }
    await Investor.updateOne({ username }, data)
  }
}

export const investments = {
  async setInvestmentStatus(username: string, id: string, status: string): Promise<void> {
    if (!username || !id || !status) { throw new Error() }
    if (!(status in investmentStatus)) { throw new Error() }
    const data = await Investor.findOne({ username })
    if (!data || !data.investments) { return }
    let flag: boolean = false
    data.investments.forEach((item) => {
      if (item.id === id) {
        item.status = investmentStatus[status]
        flag = true
      }
    })
    if (!flag) { return }
    await Investor.updateOne({ username }, data)
  },
  async setInvestmentNote(username: string, id: string, note: string): Promise<void> {
    if (!username || note === undefined) { throw new Error() }
    const data = await Investor.findOne({ username })
    if (!data || !data.investments) { return }
    let flag: boolean = false
    data.investments.forEach((item) => {
      if (item.id === id) {
        item.note = note
        flag = true
      }
    })
    if (!flag) { return }
    await Investor.updateOne({ username }, data)
  }
}

export const admins = {
  async checkAdmin(username: string, password: string): Promise<boolean> {
    if (!username || !password) { throw new Error() }
    const data = await Admin.findOne({ username })
    if (!data) { return false }
    return await argon2.verify(data.password, password)
  },
  async changePassword(username: string, oldPassword: string, newPassword: string): Promise<boolean> {
    if (!username || !oldPassword || !newPassword) { throw new Error() }
    const data = await Admin.findOne({ username })
    if (!data) { return }
    if (await argon2.verify(data.password, oldPassword)) {
      const password = await argon2.hash(newPassword)
      await Admin.updateOne({ username }, { $set: { password } })
      return true
    }
    else {
      return false
    }
  }
}