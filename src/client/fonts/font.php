<?php 
declare(strict_types=1);

class GetFontFile {
	
	protected $get;
	protected $mime;
	protected $fonts = [];
	protected $mimes = [
		'woff2' => 'application/font-woff2',
		'woff'  => 'font/woff',
		'eot'   => 'font/eot',
		'ttf'   => 'font/ttf',
		'svg'   => 'font/svg',
	];
	
	public function __construct($param) {
		$this->EchoFont($param);
    }
	
	protected function protection(string $string) {  
        $string = htmlspecialchars(trim(addslashes(stripslashes(strip_tags($string)))));  
        $string = str_replace(chr(160), '', $string);  
		return $string; 
    }
	
	protected function GetFont(string $get) {
		
		foreach (glob("./font_list/*.{woff,woff2}", GLOB_BRACE) as $i => $u) {
			$this->fonts[] = basename($u);
		}
		
		$this->get  = $this->protection($get);
		$this->mime = explode('.', $this->get);
		
		if (count($this->mime) < 2) {
			return false;
		}
		
		if (!array_key_exists($this->mime[1], $this->mimes)) {
			return false;
		}
			
		if (in_array($this->get, $this->fonts)) {
			return file_get_contents('./font_list/' . $this->get);					
		}
		
		return false;
	}
	
	private function EchoFont(string $font) {
		
		$fontfile = $this->GetFont($font);

		if ($fontfile) {
			header('Access-Control-Allow-Origin: *');
			header('Content-Type: ' . $this->mimes[$this->mime[1]]);
			header('Content-Length: ' . filesize($this->get));
			header('Expires: ' . date('r', time() + 864000));
			
			echo $fontfile;
			
		} else {	
			
			http_response_code(404);		
		}
	}
}

new GetFontFile($_GET['f']);
?>