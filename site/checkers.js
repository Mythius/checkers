class CheckerPiece extends Sprite{
	static pieces = [];
	static drawAll(){
		for(let piece of CheckerPiece.pieces){
			piece.draw();
		}
	}
	constructor(tile,color='red'){
		super(`checkers/${color[0]}.png`);
		this.currentTile = tile;
		this.isKing = false;
		tile.piece = this;
		this.color = color;
		CheckerPiece.pieces.push(this);
		this.position = this.currentTile.getCenter();
	}
	moveToTile(newtile){
		this.currentTile.piece = null;
		this.currentTile = newtile;
		if(newtile.y == 0 || newtile.y == 7){
			this.isKing = true;
			this.element.src=`checkers/${this.color[0]}k.png`;
		}
		newtile.piece = this;
	}
	async remove(){
		this.currentTile.piece = null;
		this.currentTile = null;
		await this.slideTo(canvas.width + 100,canvas.height/2)
		let ix = CheckerPiece.pieces.indexOf(this);
		if(ix!=-1){
			CheckerPiece.pieces.splice(ix,1);
		}
	}
	async moveTo(tile){
		let ct = tile.getCenter();
		await this.slideTo(ct.x,ct.y);
	}
	async makeAutoMove(tile){
		this.moveToTile(tile);
		await this.moveTo(tile);
	}
}