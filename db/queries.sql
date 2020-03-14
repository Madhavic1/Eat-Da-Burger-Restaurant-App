use burgers_db;
select * from burgers;--  where devoured = false;
-- delete from burgers where id between  and 17;
UPDATE burgers SET devoured=false WHERE id between 21 and 36 ;

delete from burgers;

drop table burgers;

-- burgers table creation
CREATE TABLE burgers (
    id INT NOT NULL AUTO_INCREMENT ,
    burger_name VARCHAR(255) NOT NULL,
    devoured BOOLEAN DEFAULT false,
    PRIMARY KEY(id)
);

