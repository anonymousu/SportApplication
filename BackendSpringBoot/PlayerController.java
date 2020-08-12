package com.example.SportApplication.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.Deflater;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.apache.tomcat.util.codec.binary.Base64;

import com.example.SportApplication.model.Input;
import com.example.SportApplication.model.Player;
import com.example.SportApplication.service.PlayerService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/sports")
public class PlayerController {
	
	@Autowired
	private PlayerService playerService;
	
	
	  @GetMapping("/players") 
	  public List<Player> getAllPlayers(){ 
		  return playerService.getAllPlayers(); 
		  }
	 
	/*
	 * @GetMapping("/players") public List<Player> getAllPlayers(){ return
	 * findPaginated(1,playerService.getAllPlayers()); }
	 */
	
	@GetMapping("/players/{id}")
	public Player getPlayer(@PathVariable Long id){
		  return playerService.getPlayer(id);
	 }
	@GetMapping("/players/userName/{userName}")
	public List<Player> getPlayer(@PathVariable String userName){
		  return playerService.getPlayer(userName);
	 }
	@GetMapping("/players/id/{id}")
	public List<Player> getPlayerById(@PathVariable Long id){
		  return playerService.getPlayerById(id);
	 }
	
	@DeleteMapping("/players/{id}")
	public void deletePlayer(@PathVariable Long id){
		  playerService.deletePlayer(id);
	 }
	@DeleteMapping("/players/deleteInbatch}")
	public void deleteInBatch(@RequestBody List<Player> playerList) {
		playerService.deleteInBatch(playerList);
	}

	@PutMapping("/players/{id}")
	 public void updatePlayer(@PathVariable Long id, @RequestBody Player player) {
		 playerService.updatePlayer(id, player);
	 }
	
	/*@PostMapping("/players")
	public Player addPlayer(@RequestBody Player player) {
		return playerService.addPlayer(player);
	}*/
		/*
		 * @RequestMapping(value = "/players",method = RequestMethod.POST, consumes =
		 * "multipart/form-data")
		 * 
		 * @ResponseBody public Player addPlayer(@RequestPart("uploadFile")
		 * MultipartFile file, @RequestPart("info") Player player){
		 * System.out.println("reaching controller"); return
		 * playerService.addPlayer(player,file); }
		 */
	@PostMapping("/players")
	public ResponseEntity<Player> addPlayer(@RequestParam(value="uploadFile",required = false) MultipartFile file, @RequestParam("info") String player) throws JsonParseException, JsonMappingException,IOException {
		Player player1 = new ObjectMapper().readValue(player, Player.class);
		if(file != null) {	
			System.out.println("file is not null");
		    player1.setPhoto(file.toString());
		   player1.setFileName(file.getOriginalFilename());
		}
		Player savedPlayer = playerService.addPlayer(player1);
		if(savedPlayer != null) {
			return new ResponseEntity<Player>(player1, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Player>(player1, HttpStatus.BAD_REQUEST);
		}
		
	}
	
	
	public static byte[] compressBytes(byte[] data) {
		Deflater deflater = new Deflater();
		deflater.setInput(data);
		deflater.finish();

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		while (!deflater.finished()) {
			int count = deflater.deflate(buffer);
			outputStream.write(buffer, 0, count);
		}
		try {
			outputStream.close();
		} catch (IOException e) {
		}
		System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

		return outputStream.toByteArray();
	}
	
	/*
	 * @PostMapping("/players") public Player UploadImage(@RequestParam("myFile")
	 * MultipartFile file) throws IOException { Player img = new Player(
	 * file.getOriginalFilename(),file.getContentType(),file.getBytes() ); final
	 * Player savedImage = playerService.UploadImage(img);
	 * System.out.println("Image saved"); return savedImage; }
	 */
	//@RequestMapping(value = "/file",method = RequestMethod.POST, consumes = "multipart/form-data")
	//@PutMapping("/players/uploadImage/{id}", consumes = "multipart/form-data")
	/*
	 * public Player UploadImage(@PathVariable Long id,@RequestBody MultipartFile
	 * file) { try { //Base64Utils.decodeFromString(file.getBase64()); return
	 * playerService.UploadImage(id,file); } catch (IOException e) { // TODO
	 * Auto-generated catch block e.printStackTrace();
	 * System.out.println("IN catch"); return null; } }
	 */
	
	
	  @GetMapping("/players2") 
	  public List<Player> findListByName(@RequestParam Long id){
		  return playerService.findListByFirstName(id); 
		  }
	 
	@GetMapping("/searchPlayers")
	public List<Player> findListByFirstNameOrLastNameOrIdOrUserName(@RequestParam(required = false) String firstName,
			@RequestParam(required=false) String lastName,@RequestParam(required=false) String userName,@RequestParam(required = false) String id){
		if(firstName==null && lastName==null && userName==null && id==null) {
			System.out.println("Please enter search fileds");
		}
		 System.out.println("controller :" );
        System.out.println("lastName :" + lastName);
        System.out.println("firstName : " + firstName);
        System.out.println("userName: " + userName);
        if(lastName==null) {
        	
        }
		return playerService.findListByFirstNameOrLastNameOrIdOrUserName(firstName,lastName,userName,id);
	 }
		
	@PostMapping("/delete/players")
	public ResponseEntity<Void> deleteProducts(@RequestBody Input input) {
		System.out.println("coming to controller");
		playerService.deletePlayersTog(input.getIds());

		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	@DeleteMapping("/delete/players")
	public void deletePlayers(@RequestParam(value="id") List<Long> ids) {
		System.out.println("coming to controller" + ids.size());
		for(Long i: ids) {
			playerService.deletePlayers(i);
		}
	}
	
	@GetMapping("/page/{pageNo}")
	public String findPaginated(@PathVariable int pageNo, Model model) {
		int pageSize = 5;
		
		Page<Player> page = playerService.findPaginated(pageNo, pageSize);
		List<Player> listPlayers = page.getContent();
		
		model.addAttribute("currentPage",page.getNumber());
		model.addAttribute("totalPages",page.getNumberOfElements());
		model.addAttribute("totalItems", page.getTotalElements());
		model.addAttribute("listPlayers", listPlayers);
		return "index";
	}
}
