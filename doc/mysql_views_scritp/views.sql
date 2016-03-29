# Average by bath

drop table AVERAGE_BY_BATH;
create view AVERAGE_BY_BATH as
  select
    B.id as ID,
    B.id as BATH_ID,
    ( select avg(M.value)
      from mark M
      where M.bath_id = B.id
      group by M.bath_id ) as AVG_VALUE
  from bath B;


# Average by bath and service

drop table AVERAGE_BY_BATH_AND_SERVICE;
create view AVERAGE_BY_BATH_AND_SERVICE as
  select
    B.id as ID,
    B.id as BATH_ID,
    S.id as SERVICE_ID,
    ( select avg(M.value)
      from mark M
      where M.bath_id = B.id
            and M.service_id = S.id
      group by M.bath_id, M.service_id ) as AVG_VALUE
  from bath B, service S;


# Average by bath and user

drop table AVERAGE_BY_BATH_AND_USER;
create view AVERAGE_BY_BATH_AND_USER as
  select
    B.id as ID,
    B.id as BATH_ID,
    U.id as USER_ID,
    ( select avg(M.value)
      from mark M
      where M.bath_id = B.id
            and M.user_id = U.id
      group by M.bath_id, M.user_id ) as AVG_VALUE
  from bath B, user U;