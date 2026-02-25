import  prisma  from "../prisma/client";
import { Prisma,PrismaClient, SetStatus, Set } from "@prisma/client";
import { EndMatch, EndMatchObject} from "./match.service";

  export interface StartSetInput{
      matchId:number,
      setNumber:number

  }

  export interface EndSetInput{
      playerGames:number,
      opponentGames:number,
      notes?:string
  }

  export type EndSetResult =
  | {
      matchFinished: true;
      matchWon: boolean;
    }
  | {
      matchFinished: false;
      nextSet: {
        id: number;
        setNumber: number;
        isSuperTiebreak: boolean;
      };
    };


  export async function StartSet(
    data: StartSetInput,
    db: Prisma.TransactionClient | PrismaClient = prisma
  ): Promise<Set> {
    return db.set.create({ data });
  }

  export async function EndSet(id: number, data: EndSetInput): Promise<EndSetResult>
  {
    return prisma.$transaction(async (tx) => {
  
      const currentSet = await tx.set.findUnique({
        where: { id },
        include: { match: true }
      });
  
      if (!currentSet)
        throw new Error("Set no encontrado");
  
      if (currentSet.status === SetStatus.CLOSED)
        throw new Error("El set ya está cerrado");
  
      const isThirdSet = currentSet.setNumber === 3;
      const isSuperTiebreak =
        isThirdSet && currentSet.match.supertiebreak;
  
      validateSetScore(
        data.playerGames,
        data.opponentGames,
        isSuperTiebreak
      );
  
      await closeSet(
        tx,
        id,
        data.playerGames,
        data.opponentGames
      );
  
      return processMatchAfterSetClosed(
        tx,
        currentSet.matchId,
        currentSet.setNumber,
        currentSet.match.supertiebreak
      );
    });
  }
  
  
  async function closeSet(
    tx: Prisma.TransactionClient,
    setId: number,
    playerGames: number,
    opponentGames: number
  ) {
    const playerWon = playerGames > opponentGames;
  
    return tx.set.update({
      where: { id: setId },
      data: {
        playerGames,
        opponentGames,
        status: SetStatus.CLOSED,
        won: playerWon
      }
    });
  }

  async function processMatchAfterSetClosed(
    tx: Prisma.TransactionClient,
    matchId: number,
    currentSetNumber: number,
    supertiebreak: boolean
  ): Promise<EndSetResult>
   {
  
    const closedSets = await tx.set.findMany({
      where: {
        matchId,
        status: SetStatus.CLOSED
      }
    });
  
    const playerWins = closedSets.filter(s => s.won === true).length;
    const opponentWins = closedSets.filter(s => s.won === false).length;
  
    // 🏆 alguien ganó 2 sets
    if (playerWins === 2 || opponentWins === 2) {
      const playerWonMatch = playerWins > opponentWins;
  
      await closeMatch(tx, matchId, playerWonMatch);
  
      return {
        matchFinished: true,
        matchWon: playerWonMatch
      };
    }
  
    // 🏁 estoy cerrando tercer set
    if (currentSetNumber === 3) {
      const playerWonMatch = playerWins > opponentWins;
  
      await closeMatch(tx, matchId, playerWonMatch);
  
      return {
        matchFinished: true,
        matchWon: playerWonMatch
      };
    }
  
    // ➕ crear siguiente set
    const nextSetNumber = currentSetNumber + 1;
  
    const newSet = await tx.set.create({
      data: {
        matchId,
        setNumber: nextSetNumber
      }
    });
  
    return {
      matchFinished: false,
      nextSet: {
        id: newSet.id,
        setNumber: newSet.setNumber,
        isSuperTiebreak:
          nextSetNumber === 3 && supertiebreak
      }
    };
  }
  

  async function closeMatch(
    tx: Prisma.TransactionClient,
    matchId: number,
    playerWon: boolean
  ) {
    return EndMatch(
      matchId,
      {
        won: playerWon,
        notes: ""
      },
      tx
    );
  }
  
  function validateSetScore(
    player: number,
    opponent: number,
    isSuperTiebreak: boolean
  ) {
    // ---- VALIDACIONES BÁSICAS ----
    if (!Number.isInteger(player) || !Number.isInteger(opponent)) {
      throw new Error("Los juegos deben ser números enteros");
    }
  
    if (player < 0 || opponent < 0) {
      throw new Error("Score inválido");
    }
  
    if (player === opponent) {
      throw new Error("Un set no puede terminar empatado");
    }
  
    const max = Math.max(player, opponent);
    const min = Math.min(player, opponent);
    const diff = max - min;
  
    // ============================================================
    // 🔥 SUPER TIEBREAK (a 10 con diferencia de 2)
    // ============================================================
    if (isSuperTiebreak) {
      if (max < 10) {
        throw new Error("Super tiebreak inválido: mínimo 10 puntos");
      }
  
      if (diff < 2) {
        throw new Error("Super tiebreak inválido: diferencia mínima de 2");
      }
  
      // 🔒 Evitar resultados inflados
      if (min < 9) {
        // si el rival tiene menos de 9, debe terminar exactamente en 10
        if (max !== 10) {
          throw new Error("Super tiebreak inválido: debía terminar en 10");
        }
      } else {
        // si están 9-9 o más, debe ganar por 2 exactos
        if (max !== min + 2) {
          throw new Error(
            "Super tiebreak inválido: debe ganar por 2 exactos"
          );
        }
      }
  
      return;
    }
  
    // ============================================================
    // 🎾 SET NORMAL
    // ============================================================
  
    if (max < 6) {
      throw new Error("Set inválido: mínimo 6 juegos");
    }
  
    if (diff < 2 && max !== 7) {
      throw new Error("Set inválido: diferencia mínima de 2");
    }
  
    // 6-x
    if (max === 6) {
      if (min > 4) {
        // 6-5 no es válido
        throw new Error("Resultado inválido");
      }
      return;
    }
  
    // 7-x
    if (max === 7) {
      if (!(min === 5 || min === 6)) {
        throw new Error(
          "Resultado inválido (7 solo válido contra 5 o 6)"
        );
      }
      return;
    }
  
    // Evitar 8-6, 9-7, etc.
    if (max > 7) {
      throw new Error("Set inválido");
    }
  }
  