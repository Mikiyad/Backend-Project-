import { Router } from "express";
import {CommunityRoutes} from "./CommunityRoutes";
import { EcommerceRoutes } from "./EcommerceRoutes";
import {EderRoutes} from "./EderRoutes";
import {EqubRoutes} from "./EqubRoutes";
import {FarmRoutes} from "./FarmingRoutes";
import {LoanRoutes} from "./LoanRoutes";
import {MarketRoutes} from "./MarketRoutes";
import { MultiMediaRoutes } from "./MultiMediaRoutes";
import { WeatherRoutes } from "./WeatherRoutes";
import { VoiceRoutes } from "./VoiceRoutes";
import { MessageRoutes } from "./MessageRoutes";
import { UserRoutes } from "./UserRoutes";
import { FaithRoutes } from "./FaithRoutes";
import { NotificationRoutes } from "./NotificationRoutes";
import { ProductRoutes } from "./ProductRoutes";
import { FarmingTipController } from "../controllers/FarmingTipController";
import { FmRoutes } from "./FMRadioRoutes";
import { FuelRoutes } from "./FuelRoutes";
import { SocialRoutes } from "./SocialRoutes";

const router = Router();

router.use("/news", CommunityRoutes);
router.use("/ecommerce", EcommerceRoutes);
router.use("/eder", EderRoutes);
router.use("/equb", EqubRoutes);
router.use("/socials",SocialRoutes);
router.use("/farming", FarmRoutes);
router.use("/faiths", FaithRoutes);
router.use("/fm", FmRoutes);
router.use("/fuels", FuelRoutes);
router.use("/loan", LoanRoutes);
router.use("/market", MarketRoutes);
router.use("/multi", MultiMediaRoutes);
router.use("/weathers", WeatherRoutes);
router.use("/voices", VoiceRoutes);
router.use("/message",MessageRoutes)
router.use("/users",UserRoutes);
router.use("/notifications", NotificationRoutes);

export { router as RouterInitalizor };
