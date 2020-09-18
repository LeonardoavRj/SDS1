package com.devsuperior.dspesquisa.entities.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.dspesquisa.entities.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
	//este foi criado hj 18/09
}
