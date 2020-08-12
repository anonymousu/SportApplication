package com.example.SportApplication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.SportApplication.model.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long>{

	@Query("select p from Player p where p.id like %?1 ")
	List<Player> findListByFirstName(@Param("id") Long id);
	
	@Query("select p from Player p where p.userName like %:userName% ")
	List<Player> findByuserName(@Param("userName") String userName);
	
	@Query("select p from Player p where CONCAT(p.id,'') like %:id% ")
	List<Player> findByIdss(@Param("id") Long id);
	
	@Modifying
	@Query("DELETE FROM Player p WHERE p.id IN (:ids)")
	public void deletePlayerByIdsTog(@Param(value = "ids") List<Long> ids);
	
	@Modifying
	@Query("DELETE FROM Player p WHERE p.id IN (:id)")
	public void deletePlayerByIds(@Param(value = "id") Long id);
	
	@Query("select p from Player p where CONCAT(p.firstName,'') like %:firstName% and CONCAT(p.lastName,'') like %:lastName% and CONCAT(p.userName,'') like %:userName% and CONCAT(p.id,'') like %:id%")
	List<Player> findListByFirstNameOrLastNameOrIdOrUserName(
			@Param("firstName") String firstName,@Param("lastName") String lastName, @Param("userName") String userName, @Param("id") String id);
	//List<Player> findByFirstNameContainingAndLastNameContainingAndUserNameContaining(
	//			String firstName,String lastName, String userName);
	//@Modifying
	//@Query("update Player p set p.photo = photo where p.id = id")
	//Player savePlayerImage(Long id,byte[] photo);
	
}
//select * from players p where p.first_Name like '%Rah%';
//or p.lastName like '%:lastName%' or p.userName like '%:userName%' "
//+ "or p.id like '%:id%' "
