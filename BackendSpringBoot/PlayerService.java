package com.example.SportApplication.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import com.example.SportApplication.model.Player;
import com.example.SportApplication.repository.PlayerRepository;

@Service
public class PlayerService {

	@Autowired
	private PlayerRepository playerRepository;
	
	/* private List<Player> players = new ArrayList<>(Arrays.asList(
             new Player(1,"Geeta Singh", "Geeta", "Singh", "abc street, 12000", "134567890", "Geeta.Singh@gmail.com", null, 5, 10,3,7,0),
             new Player(2,"Naveen Poddar", "Naveen", "Poddar", "xyz street, 15000", "9807654321", "Geeta.Singh@gmail.com", null, 4, 12,2,8,2),
             new Player(3,"Ravi Saurabh", "Ravi", "Saurabh", "qrs street, 18000", "8709651423", "Geeta.Singh@gmail.com", null, 3.5, 15,6,8,1)
			));*/
	 
	 public List<Player> getAllPlayers(){
		// return players;
		 return playerRepository.findAll();
	 }
	 
	 public Player addPlayer(Player player) {
		 return playerRepository.save(player);
	 }
	 
	 public Player getPlayer(Long id) {
		 return playerRepository.findById(id).get();
	 }
	 
	 public void updatePlayer(Long id, Player player) {
		 playerRepository.save(player);
	 }
	 
	 public List<Player> getPlayer(String userName) {
		 return playerRepository.findByuserName(userName);
	 }
	 
	 public List<Player> getPlayerById(Long id){
		 return playerRepository.findByIdss(id);
	 }
	 
	 
	 @Transactional
		public void deleteInBatch(List<Player> studentList) {
			playerRepository.deleteInBatch(studentList);
		}
		
		  @Transactional 
		  public void deletePlayers(Long id) {
		  playerRepository.deletePlayerByIds(id); }
		  
		  @Transactional 
		  public void deletePlayersTog(List<Long> ids) {
			  playerRepository.deletePlayerByIdsTog(ids);
		  }
		 
	 
		/*
		 * public void deletePlayers(Long id) { playerRepository.deletePlayerByIds(id);
		 * }
		 */
	 
	public List<Player> findListByFirstName(Long id){ return
		  playerRepository.findListByFirstName(id); }
		 
	 public List<Player> findListByFirstNameOrLastNameOrIdOrUserName(String firstName, String lastName, String userName,String id){
		 System.out.println("service :" );
		 return playerRepository.findListByFirstNameOrLastNameOrIdOrUserName(firstName,lastName,userName,id);
	 }
	 
	 
	 public void deletePlayer(Long id) {
		 playerRepository.deleteById(id);
	 }
		/*
		 * public Player UploadImage(Long playerId, MultipartFile file) throws
		 * IOException { //Player img = new Player(
		 * file.getOriginalFilename(),file.getContentType(), file.getBytes() ); // final
		 * Player savedImage = playerRepository.save(img); //
		 * System.out.println("Image saved"); // return savedImage; String
		 * nameExtension[] = file.getContentType().split("/"); String profileImage =
		 * playerId + "." + nameExtension[1]; System.out.println("ProfileImage  :: " +
		 * profileImage);
		 * 
		 * String fileName = StringUtils.cleanPath(file.getOriginalFilename()); try { //
		 * Check if the file's name contains invalid characters
		 * if(fileName.contains("..")) {
		 * System.out.println("Sorry! Filename contains invalid path sequence " +
		 * fileName); } Player player = new Player(fileName, file.getContentType(),
		 * file.getBytes()); return playerRepository.save(player); }catch (IOException
		 * ex) { System.out.println("Could not store file " + fileName +
		 * ". Please try again!"); return null; }
		
           
	 } */
	 
	 public Page<Player> findPaginated(int pageNo, int pageSize){
		 Pageable pageable = PageRequest.of(pageNo, pageSize);
		 return this.playerRepository.findAll(pageable);
	 }
	 
}
