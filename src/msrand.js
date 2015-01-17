/**
 * Code via http://rosettacode.org/wiki/Deal_cards_for_FreeCell
 */
var MSRand = function(seed){
    this.seed = seed;
}
MSRand.prototype.random = function(){
    this.seed = (this.seed * 214013 + 2531011) & 0x7FFFFFFF;
    return ((this.seed >> 16) & 0x7fff);
}
MSRand.prototype.msMaxRand = function(max){
    max = this.msRand() % max;
    return max;
}

module.exports = MSRand;
