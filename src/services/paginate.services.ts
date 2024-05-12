import axios from 'axios';
import { env } from '../config/env.config';
import { DbList } from './../database/list.database';
import { In } from 'typeorm';

export class PaginateService {
   constructor() {}

   private DEFAULT_LIMIT = 20;

   public async body(limit: number, page: number, dcount: number) {
      const DEFAULT_LIMIT = new PaginateService().DEFAULT_LIMIT;

      const LIMIT = limit ? Number(limit) : DEFAULT_LIMIT;
      const PAGE = page ? Number(page) - 1 : 0;
      const OFFEST = page ? (Number(page)) * LIMIT : 0;
      const DCOUNT = dcount ? Number(dcount) : DEFAULT_LIMIT;

     
      return {
         LIMIT,
         OFFEST,
         PAGE,
         DCOUNT,
      };
   }

   public async all(
      TotalCount: any,
      GetData: any,
      LIMIT: any,
      PAGE: any,
      OFFEST: any,
      DCOUNT: any
   ) {
      const CountLimit = Math.floor((TotalCount - PAGE) / LIMIT);
      const pgc = TotalCount % LIMIT == 0 ? CountLimit : CountLimit + 1;

      const current = PAGE == 0 ? 1 : PAGE + 1;
      const previous = current - 1;

      const DEFAULT_LIMIT = new PaginateService().DEFAULT_LIMIT;

      const Paginate = {
         current: current,
         previous: previous <= 0 ? null : previous,
         next: current + 1,
         first: 1,
         last: pgc,
         fromResult: OFFEST == 0 ? DEFAULT_LIMIT : OFFEST,
         totalResult: TotalCount,
         pageCount: pgc,
      };

      
      const DataPaginate = GetData.slice(
         OFFEST == 0 ? 0 : DCOUNT,
         OFFEST == 0 ? DEFAULT_LIMIT : OFFEST
      );

      return { Paginate, DataPaginate };
   }
}
