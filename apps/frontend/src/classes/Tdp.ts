interface argTdp{
  tdpId?:string,
  status?:string,
  cd?:number,
  rep?:string,
  ferme?:number,
  level?:number,
  option?:string,
  rco?:number,
  regletteNbr?:string,
  regletteType?:string,
  salle?:number,
  found?: boolean,
  _id?:string,
  plot?:number[],
  fetched?:boolean,
  position?: number,
}

export class Tdp {
  tdpId:string
  status:string
  cd:number
  rep:string
  ferme:number
  level:number
  option:string
  rco:number
  regletteNbr:string
  regletteType:string
  salle:number
  found: boolean
  _id:string
  plot:number[]
  fetched:boolean
  position: number
  constructor({status, cd, rep, ferme, level, option, rco, regletteNbr, regletteType, salle, found, _id, plot, fetched, position}:argTdp) {
      this.status = status||'ghost'
      this.found = found||false
      this.cd = cd||0
      this.rep = rep||''
      this.ferme = ferme||0
      this.level = level||0
      this.option = option||''
      this.rco = rco||0
      this.regletteNbr = regletteNbr||''
      this.regletteType = regletteType||'x'
      this.salle = salle||0
      this.plot =  plot||[]
      this._id = _id||''
      this.tdpId= ''+this.rep+this.regletteType+this.regletteNbr
      this.fetched = fetched||false
      this.position = position||0
  }
}