import qs from 'qs'
/**
 * 请求接口
 * @param {*} options 
 * @returns 
 */
function createRequest(url, options = {}, fn) {
	options = Object.assign({
		method: 'POST',
		mode: "cors",
		headers: {
			// "Content-Type": "Application/json"
		}
	}, options)
	return function(data = {}) {
		fn && fn(data);
		if (options.method === 'POST') {
			return fetch(url, Object.assign({}, options, {
				body: JSON.stringify(data)
			}))
		} else {
			return fetch(`${url}${/\?/.test(url) ? '&' : '?'}${decodeURIComponent(qs.stringify(data))}`, options)
		}
	}
}

/**
 * 基金信息
 */
export const getSubscribeSelf = createRequest('https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo?pageIndex=1&pageSize=200&plat=Android&appType=ttjj&product=EFund&Version=1&deviceid=b22df6cd-1556-40e8-98d3-b4f70e18eea0', {
	method: "GET"
})

/**
 * etf基金信息
 */
export const getSubscribeETF = createRequest('https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&fields=f2,f3,f4,f12,f13,f14&', {
	method: "GET"
}, function(data) {
	data['_'] = Date.now()
})
/**
 * 获取地域板块信息
 */
export const getAreaBlockInfo = createRequest('https://67.push2.eastmoney.com/api/qt/clist/get?cb=jQuery11240532045987854058_1698995746075&pn=1&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&wbp2u=|0|0|0|web&fid=f3&fs=b:BK0155+f:!50&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f45', {
	method: 'GET'
}, function(data) {
	data['_'] = Date.now()
	if (!data.pz) {
		data.pz = 900
	}
})
/**
 * 获取行业板块信息
 */
export const getIndustryBlockInfo = createRequest('https://65.push2.eastmoney.com/api/qt/clist/get?cb=jQuery11240550056555489338_1698997988587&pn=1&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&wbp2u=|0|0|0|web&fid=f3&fs=m:90+t:2+f:!50&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107,f104,f105,f140,f141,f207,f208,f209,f222', {
	method: 'GET'
}, function(data) {
	data['_'] = Date.now()
	if (!data.pz) {
		data.pz = 900
	}
})
/**
 * 查询股票行业数据
 */
export const getIndustryStockBlockInfo = createRequest('https://50.push2.eastmoney.com/api/qt/clist/get?cb=jQuery112408352917808618949_1705558913065&pn=1&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&wbp2u=|0|0|0|web&fid=f3&fs=m:90+t:2+f:!50&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107,f104,f105,f140,f141,f207,f208,f209,f222', {
	method: 'GET'
}, function(data) {
	data['_'] = Date.now()
	if (!data.pz) {
		data.pz = 100
	}
})
/**
 * 查询某个行业的股票
 */
export const getIndustryStockBlockList = createRequest('https://65.push2.eastmoney.com/api/qt/clist/get?cb=jQuery112404066286937767727_1705560070112&pn=1&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&wbp2u=|0|0|0|web&fid=f3&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f45', {
	method: 'GET'
}, function(data) {
	data['_'] = Date.now()
	if (!data.fs) {
		data.fs = 'b:BK1031 f:!50'
	}
	if (!data.pz) {
		data.pz = 10
	}
})

export const getAllFund = createRequest('/Data/Fund_JJJZ_Data.aspx?t=1&lx=1&letter=&gsid=&text=&sort=dwjz,desc&atfc=&onlySale=0', {
	method: 'GET',
	mode: "same-origin", // no-cors, *cors, same-origin
}, function(data) {
	data['dt'] = Date.now()
	if (!data.page) {
		data.page = '2,200'
	}
})
